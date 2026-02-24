import uuid
from sqlalchemy import Column, String, Numeric, Integer, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Menu(Base):
    __tablename__ = "menu"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), nullable=False) # Zachowuję Twoją nazwę 'owner_id'
    default_currency_id = Column(UUID(as_uuid=True), ForeignKey("currencies.id"), nullable=False)
    name = Column(String)
    description = Column(String)

    currency = relationship("Currency", back_populates="menus")
    sections = relationship("Section", back_populates="menu")
    items = relationship("MenuItem", back_populates="menu")

class Section(Base):
    __tablename__ = "sections"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("menu.id"), nullable=False)
    name = Column(String)
    description = Column(String)
    position = Column(Integer, default=0)

    menu = relationship("Menu", back_populates="sections")
    items = relationship("MenuItem", back_populates="section")

class ProductCategory(Base):
    __tablename__ = "product_categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    is_alcoholic = Column(Boolean, default=True)

class BaseCategory(Base):
    __tablename__ = "base_category"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)

class MenuItem(Base):
    __tablename__ = "menu_items"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("menu.id"), nullable=False)
    section_id = Column(UUID(as_uuid=True), ForeignKey("sections.id"), nullable=True)
    product_category_id = Column(UUID(as_uuid=True), ForeignKey("product_categories.id"), nullable=False)
    base_alcohol_id = Column(UUID(as_uuid=True), ForeignKey("base_category.id"), nullable=True)
    
    name = Column(String)
    price = Column(Numeric(10, 2))
    volume = Column(Numeric)
    description = Column(Text)
    ingredients = Column(ARRAY(Text)) 
    is_available = Column(Boolean, default=True)
    position = Column(Integer, default=0)
    metadata = Column(JSONB) 

    menu = relationship("Menu", back_populates="items")
    section = relationship("Section", back_populates="items")

class Currency(Base):
  __tablename__ = "currencies"
  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  name = Column(String)
  symbol = Column(String)
  
  menus = relationship("Menu", back_populates="currency")
