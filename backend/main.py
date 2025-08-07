
from fastapi import FastAPI, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FeatureCreate(BaseModel):
    title: str
    description: str = ""

@app.get("/features")
def read_features(db: Session = Depends(get_db)):
    return db.query(models.Feature).all()

@app.post("/features")
def create_feature(feature: FeatureCreate, db: Session = Depends(get_db)):
    new_feature = models.Feature(
        title=feature.title,
        description=feature.description
    )
    db.add(new_feature)
    db.commit()
    db.refresh(new_feature)
    return new_feature

@app.post("/features/{feature_id}/upvote")
def upvote_feature(feature_id: int, db: Session = Depends(get_db)):
    feature = db.query(models.Feature).filter(models.Feature.id == feature_id).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    feature.votes += 1
    db.commit()
    db.refresh(feature)
    return {"votes": feature.votes}
