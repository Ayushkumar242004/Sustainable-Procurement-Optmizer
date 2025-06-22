from bson import ObjectId
from typing import Any, Dict, List, Union
import json

def serialize_objectid(obj: Any) -> Any:
    """Convert MongoDB ObjectId to string for JSON serialization"""
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: serialize_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [serialize_objectid(item) for item in obj]
    return obj

def serialize_mongo_document(document: Dict) -> Dict:
    """Serialize a MongoDB document by converting ObjectId fields to strings"""
    if document is None:
        return {}
    
    serialized = {}
    for key, value in document.items():
        if isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, dict):
            serialized[key] = serialize_mongo_document(value)
        elif isinstance(value, list):
            serialized[key] = [serialize_objectid(item) for item in value]
        else:
            serialized[key] = value
    
    return serialized

class JSONEncoder(json.JSONEncoder):
    """Custom JSON encoder for MongoDB ObjectId"""
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)
