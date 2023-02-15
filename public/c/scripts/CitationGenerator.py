import os
import json

with open(os.path.abspath(os.path.join(__file__, '../../data/listings.json'))) as f:
    listings = json.load(f)

format = '(last), (first). \033[3mZillow\033[0m, (date_published), (url). Accessed 15 Feb. 2023.'

for listing in listings:
    citation = format.replace("(last)", listing["author"].split(" ")[1])
    citation = citation.replace("(first)", listing["author"].split(" ")[0])
    citation = citation.replace("(date_published)", listing["last_updated"])
    citation = citation.replace("(url)", listing["url"])

    print(citation)
    for image in listing["images"]:
        citation = format.replace("(last)", listing["author"].split(" ")[1])
        citation = citation.replace("(first)", listing["author"].split(" ")[0])
        citation = citation.replace("(date_published)", listing["last_updated"])
        citation = citation.replace("(url)", image)

        print(citation)