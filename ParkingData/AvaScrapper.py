import psycopg2
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time

host = 'parkeasy.postgres.database.azure.com'
database = 'ParkEasyAz'
user = 'AlejandroMorales'
password = 'Ihoenys2024*'
sslmode = "require"

conn_string = "host={0} user={1} dbname={2} password={3} sslmode={4}".format(host, user, database, password, sslmode)
conn = psycopg2.connect(conn_string)
print("Connection established")

def scrape_and_save_data():
    driver = webdriver.Chrome() 
    driver.get('https://parking.fiu.edu')

    try:
        wait = WebDriverWait(driver, 10)
        element_present = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="parking-widget"]/div/div/ul/li[6]/div/div/div[2]/div/div/strong')))

        iterations = 6
        row_data = [datetime.now().strftime('%H:%M:%S')]

        cursor = conn.cursor()
        for i in range(iterations):
            element = driver.find_element(By.XPATH, '//*[@id="parking-widget"]/div/div/ul/li[' + str(i + 1) + ']/div/div/div[2]/div/div/strong')
            parking_number = i + 1
            availability = element.text
            
            cursor.execute("SELECT COUNT(*) FROM Parking WHERE parkingnumber = %s", (parking_number,))
            if cursor.fetchone()[0] > 0:
                cursor.execute("UPDATE Parking SET availability = %s WHERE parkingnumber = %s", (availability, parking_number))
            else:
                cursor.execute("INSERT INTO Parking (parkingnumber, availability) VALUES (%s, %s)", (parking_number, availability))
        
        conn.commit()
        
    except Exception as e:
        print(f"Error: {e}")

    finally:
        driver.quit()
        cursor.close()
        conn.close()

    time.sleep(60)

scrape_and_save_data()
