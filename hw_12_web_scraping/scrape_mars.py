# Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import requests
import os
import pandas as pd
from flask import Flask, render_template, redirect
import pymongo
from flask_pymongo import PyMongo
import time

def scrape():
    mars_dict = {}

    url = "https://mars.nasa.gov/news/"    
    r = requests.get(url)

    soup = BeautifulSoup(r.text, 'html.parser')

    titles = soup.find_all("div", class_="content_title")
    mars_dict["news_title"] = titles[0].text

    descs = soup.find_all("div", class_="rollover_description_inner")
    mars_dict["news_p"] = descs[0].text

    #use Splinter
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    urlhost = 'https://www.jpl.nasa.gov'
    browser.visit(url)

    browser.click_link_by_partial_text('FULL IMAGE')
    time.sleep(2)
    soup = BeautifulSoup(browser.html, 'html.parser')
    imgs = soup.find_all("img", class_="fancybox-image")
    #featured_image_url = urlhost + imgs[0]['src']
    mars_dict["featured_image_url"] = urlhost + imgs[0]['src']


    tweet = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(tweet)
    time.sleep(1)
    soup2 = BeautifulSoup(browser.html, 'html.parser')
    tweets = soup2.find_all("p", class_="tweet-text")
    mars_dict["mars_weather"] = tweets[0].text
   # print(mars_weather)

    facts_url = 'https://space-facts.com/mars/'
    tables = pd.read_html(facts_url)

    df = tables[0]
    df.columns = ['Property', 'Value']
    #html_table = df.to_html()
    mars_dict["html_table"] = df.to_html()
    #print(html_table)
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)
    time.sleep(1)
    soup = BeautifulSoup(browser.html, 'html.parser')
    links = soup.find_all('div', class_ = 'description')
    hemisphere_image_urls = []
    for link in links:
        # browser.click_link_by_partial_text(...)
        h3 = link.find('h3')
        browser.click_link_by_partial_text(h3.text)
        time.sleep(1)
        soup = BeautifulSoup(browser.html, 'html.parser')
        img_url = soup.find_all("a", string="Sample")
        hemisphere_image_urls.append({"title": h3.text, "img_url": img_url[0]['href']})
        browser.back()
        print(h3.text)
        print(img_url[0]['href'])
    mars_dict["hemisphere_image_urls"] = hemisphere_image_urls
    # print (hemisphere_image_urls)

    return mars_dict

app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.mars_db

@app.route("/")
def index():
    mars = db.mars.find_one()
    print(mars)
    return render_template("index.html", mars=mars)

@app.route("/scrape")
def scraper():
    mars_dict = scrape()
    print(mars_dict)
    # Drops collection if available to remove duplicates
    db.mars.drop()
    # Creates a collection in the database and inserts two documents
    db.mars.insert_one(mars_dict)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)