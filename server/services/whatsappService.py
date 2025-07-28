import os
import time
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException
from dotenv import load_dotenv

load_dotenv()

class WhatsAppNotifier:
    def __init__(self):
        # MongoDB setup with explicit database name
        self.mongo_uri = os.getenv('MONGODB_URI')
        if not self.mongo_uri:
            raise ValueError("MONGODB_URI not found in environment variables")
            
        self.client = MongoClient(self.mongo_uri)
        self.db = self.client.get_database('contacts')  # Explicit database name
        self.contacts_collection = self.db['contacts']
        
        # WhatsApp setup
        self.recipient = os.getenv('WHATSAPP_RECIPIENT')
        if not self.recipient:
            raise ValueError("WHATSAPP_RECIPIENT not found in environment variables")
            
        self.session_path = os.getenv('WHATSAPP_SESSION_PATH', './whatsapp_session')
        
        # Configure Chrome options
        self.options = webdriver.ChromeOptions()
        self.options.add_argument(f'--user-data-dir={self.session_path}')
        self.options.add_argument('--disable-dev-shm-usage')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--disable-gpu')
        self.options.add_argument('--remote-debugging-port=9222')
        
        self.driver = None
        
    def initialize_whatsapp(self):
        try:
            self.driver = webdriver.Chrome(options=self.options)
            self.driver.get('https://web.whatsapp.com/')
            
            print("Please scan the QR code to log in to WhatsApp Web")
            WebDriverWait(self.driver, 60).until(
                EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]'))
            )
            print("Successfully logged in to WhatsApp Web")
            return True
        except Exception as e:
            print(f"Error initializing WhatsApp: {str(e)}")
            return False
    
    def send_whatsapp_message(self, message: str):
        if not self.driver:
            print("WhatsApp not initialized")
            return False
            
        try:
            chat_url = f'https://web.whatsapp.com/send?phone={self.recipient}&text={message}'
            self.driver.get(chat_url)
            
            input_box = WebDriverWait(self.driver, 30).until(
                EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]'))
            )
            
            input_box.send_keys(message)
            send_button = self.driver.find_element(By.XPATH, '//button[@data-testid="compose-btn-send"]')
            send_button.click()
            
            print(f"Message sent to {self.recipient}")
            return True
        except Exception as e:
            print(f"Error sending WhatsApp message: {str(e)}")
            return False
    
    def format_message(self, contact: dict) -> str:
        created_at = contact.get('createdAt', '')
        timestamp = created_at.strftime('%Y-%m-%d %H:%M:%S') if hasattr(created_at, 'strftime') else 'N/A'
        
        return (
            "📨 *New Contact Form Submission*:\n\n"
            f"👤 *Name*: {contact.get('name', 'N/A')}\n"
            f"🏢 *Company*: {contact.get('company', 'Not provided')}\n"
            f"📧 *Email*: {contact.get('email', 'N/A')}\n"
            f"📱 *Phone*: {contact.get('phone', 'Not provided')}\n"
            f"📝 *Subject*: {contact.get('subject', 'N/A')}\n"
            f"💬 *Message*: {contact.get('message', 'N/A')}\n\n"
            f"⏰ _Received at_: {timestamp}"
        )
    
    def watch_contacts(self):
        print("Starting to watch for new contact form submissions...")
        
        last_contact = self.contacts_collection.find_one(sort=[('createdAt', -1)])
        last_timestamp = last_contact['createdAt'] if last_contact else None
        
        while True:
            try:
                query = {'createdAt': {'$gt': last_timestamp}} if last_timestamp else {}
                new_contacts = self.contacts_collection.find(query).sort('createdAt', 1)
                
                for contact in new_contacts:
                    message = self.format_message(contact)
                    if self.send_whatsapp_message(message):
                        last_timestamp = contact['createdAt']
                    else:
                        print("Failed to send WhatsApp notification")
                
                time.sleep(5)
                
            except PyMongoError as e:
                print(f"MongoDB error: {str(e)}")
                time.sleep(10)
            except Exception as e:
                print(f"Unexpected error: {str(e)}")
                time.sleep(10)

    def run(self):
        if not self.initialize_whatsapp():
            return
        
        try:
            self.watch_contacts()
        except KeyboardInterrupt:
            print("\nStopping WhatsApp notifier...")
        finally:
            if self.driver:
                self.driver.quit()
            self.client.close()

if __name__ == '__main__':
    try:
        notifier = WhatsAppNotifier()
        notifier.run()
    except Exception as e:
        print(f"Failed to start notifier: {str(e)}")