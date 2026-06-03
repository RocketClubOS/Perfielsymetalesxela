from inventory import search_product

def build_product_name(product):
    parts = [
        product.get("familia", ""),
        product.get("forma", ""),
        product.get("acabado", ""),
        product.get("medida_normalizada", ""),
        product.get("unidad", ""),
        product.get("grueso", "")
    ]

    return " ".join(part for part in parts if part).strip()


def answer_customer(question):
    results = search_product(question)

    if not results:
        return "No encontré ese producto en el inventario. ¿Me puedes dar la medida, grueso o tipo de material?"

    product = results[0]

    stock = int(float(product.get("stock", 0)))
    precio = product.get("precio_venta", "N/D")

    if stock > 0:
        disponibilidad = f"Tenemos {stock} unidades disponibles."
    else:
        disponibilidad = "Por el momento aparece sin existencia en inventario."

    product_name = build_product_name(product)

    response = f"""
Sí, encontré este producto:

{product_name}

Precio de venta: Q{precio}
{disponibilidad}
"""

    return response