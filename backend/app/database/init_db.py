from app.database.database import Base, engine

# Import all models
from app.models.user import User

Base.metadata.create_all(bind=engine)

print("✅ Database Tables Created Successfully")