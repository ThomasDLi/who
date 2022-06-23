import requests
import difflib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_root():
    return("Hello! This is the server for 'Who?'.")

@app.get("/find_post")
def find_post(msg):
    inp = msg.replace(" ", "%20")

    r = requests.get(f"https://www.reddit.com/search.json?q={inp}", headers = {'User-agent': 'whoAsked'})

    lis = []

    posts = r.json().get("data").get("children")

    for x in range(len(posts)):
        lis.append(posts[x].get("data").get("title"))

    matching_post = difflib.get_close_matches(msg, lis, 1)

    if(matching_post != [] and len(matching_post[0]) > 0):
        return(matching_post[0], posts[lis.index(matching_post[0])].get("data").get("url"), posts[lis.index(matching_post[0])].get("data").get("author"))
    else:
        if(len(posts) <= 0):
            return("I asked", "No results", "No one")
        if(matching_post == []):
            matching_post.append(posts[0].get("data").get("title"))

        print(len(posts))
        print(matching_post)
        return(posts[0].get("data").get("title"), posts[0].get("data").get("url"), posts[lis.index(matching_post[0])].get("data").get("author"))