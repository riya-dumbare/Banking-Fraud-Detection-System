from pymongo import MongoClient, ReturnDocument
from config import MONGO_CONFIG

_client = MongoClient(MONGO_CONFIG["uri"])
_db = _client[MONGO_CONFIG["database"]]


def get_collection(name):
    return _db[name]


def get_next_id(counter_name):
    counters = get_collection("counters")
    result = counters.find_one_and_update(
        {"_id": counter_name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )