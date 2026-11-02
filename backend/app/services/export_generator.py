import io
import csv
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from typing import List, Dict, Any

class ExportService:
    @staticmethod
    def generate_closet_csv(items: List[Dict[str, Any]]) -> str:
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["Title", "Brand", "Category", "Status", "Wear Count", "Price", "Cost Per Wear", "Fabric"])
        for item in items:
            cpw = round(item.get("purchase_price", 0) / max(item.get("wear_count", 1), 1), 2)
            writer.writerow([
                item.get("title"),
                item.get("brand"),
                item.get("category"),
                item.get("status"),
                item.get("wear_count"),
                f"${item.get('purchase_price', 0):.2f}",
                f"${cpw:.2f}",
                item.get("fabric_composition", "")
            ])
        return output.getvalue()

    @staticmethod
    def generate_lookbook_pdf(user_name: str, items: List[Dict[str, Any]]) -> bytes:
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.setFont("Helvetica-Bold", 18)
        p.drawString(50, 750, f"MyOutFit Curated Lookbook — {user_name}")
        p.setFont("Helvetica", 10)
        p.drawString(50, 730, "Generated from personal digital wardrobe catalog.")
        
        y = 690
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y, "Garment Inventory")
        y -= 25
        p.setFont("Helvetica", 10)
        for it in items[:15]:
            p.drawString(50, y, f"• {it.get('title')} ({it.get('brand')}) — {it.get('wear_count', 0)} wears | Status: {it.get('status')}")
            y -= 20
            if y < 60:
                p.showPage()
                y = 750

        p.showPage()
        p.save()
        buffer.seek(0)
        return buffer.getvalue()
