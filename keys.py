#!/usr/bin/env python
#keys.py
import tweepy

keys = dict(
 consumer_key =          'ceooAEZ4wBFGBDTkoGBzMxBjN',
 consumer_secret =       'pP7r7osttnZnx60PEilf6aqHzuKjs6Lzd3uXIqy8X0EXNLiyJ6',
 access_token =          '768831126097887232-osNkiSROJsKkNKtuNgpWzKbC1ohJURk',
 access_token_secret =   'kcgTlbf5SwYUzYpbPgroKlQn0EL42T0st0LxFHG5scwcK',
)


CONSUMER_KEY = 'replace with your key'
CONSUMER_SECRET = 'replace with your secret'
ACCESS_KEY = 'replace with your access key'
ACCESS_SECRET = 'replace with your access secret'
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)