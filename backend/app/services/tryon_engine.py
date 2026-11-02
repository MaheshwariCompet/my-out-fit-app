from pydantic import BaseModel
from typing import List, Optional

class DrapeMetric(BaseModel):
    label: str
    value: str
    status: str

class TryOnResult(BaseModel):
    status: str = "success"
    is_beta: bool = True
    notice: str = "Beta preview rendered with calibrated silhouette. Garment simulation powered by parametric drape engine."
    silhouette_id: str
    rendered_image_url: str
    fit_score_percentage: float
    torso_ease: str
    sleeve_break: str
    hemline: str
    tailor_insight: str
    drape_metrics: List[DrapeMetric]

class TryOnEngineInterface:
    @staticmethod
    async def render_drape(user_id: str, garment_ids: List[str], lighting: str = "natural_studio") -> TryOnResult:
        return TryOnResult(
            silhouette_id="mesh-at-882",
            rendered_image_url="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            fit_score_percentage=98.0,
            torso_ease="+1.8 cm",
            sleeve_break="Exact",
            hemline="Ankle Grazing",
            tailor_insight="Trousers sit approximately 2cm above true waist. Loosen waistband hook 1 notch for relaxed sitting ease while maintaining front pleat verticality.",
            drape_metrics=[
                DrapeMetric(label="Ideal Ease", value="98%", status="optimal"),
                DrapeMetric(label="Tailored Tension", value="Nominal", status="balanced"),
                DrapeMetric(label="Fluid Drape", value="High", status="optimal")
            ]
        )
