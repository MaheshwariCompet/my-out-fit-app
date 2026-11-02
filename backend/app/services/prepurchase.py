from pydantic import BaseModel
from typing import List

class PrePurchaseAuditResult(BaseModel):
    product_url: str
    title: str
    brand: str
    price: float
    image_url: str
    pairs_count: int
    pairing_item_ids: List[str]
    cost_per_wear_projected: float
    harmony_index: int
    recommendation: str

class PrePurchaseService:
    @staticmethod
    async def evaluate_product_url(url: str, user_id: str) -> PrePurchaseAuditResult:
        return PrePurchaseAuditResult(
            product_url=url,
            title="Structured Virgin Wool Blazer",
            brand="Totême",
            price=240.0,
            image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
            pairs_count=4,
            pairing_item_ids=["item-1", "item-2", "item-5"],
            cost_per_wear_projected=4.80,
            harmony_index=94,
            recommendation="Pairs with 4 pieces you already own. Seamless replacement for 2 worn-out jackets with immediate day-to-day utility."
        )
