from fpdf import FPDF
from datetime import datetime

class PDFInvoice(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Invoice", 0, 1, "C")
        self.set_font("Arial", "I", 9)
        self.cell(0, 10, f"Date: {datetime.today().strftime('%Y-%m-%d')}", 0, 1, "R")
        self.cell(0, 10, "OkCoded, LLC", 0, 1, "L")
        self.cell(0, 10, "2401 S Ocean Dr. Apt 1002", 0, 1, "L")
        self.cell(0, 10, "Hollywood, FL 33019", 0, 1, "L")
        self.cell(0, 10, "Email: fdcommisso@gmail.com", 0, 1, "L")
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, "Page %s" % self.page_no(), 0, 0, "C")

    def add_title(self, title):
        self.set_font("Arial", "B", 16)
        self.cell(0, 10, title, 0, 1, "C")
        self.ln(10)

    def add_item(self, description, hours, rate, total):
        self.set_font("Arial", "", 12)
        self.cell(80, 10, description, 0, 0)
        self.cell(30, 10, f"{hours} hrs", 0, 0, "C")
        self.cell(30, 10, f"${rate:.2f}", 0, 0, "C")
        self.cell(30, 10, f"${total:.2f}", 0, 1, "C")

    def add_total(self, total_amount):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "", 0, 1)  # Blank line
        self.cell(110, 10, "Total:", 0, 0, "R")
        self.cell(30, 10, f"${total_amount:.2f}", 0, 1, "C")

    def add_invoice_details(self, items, hourly_rate):
        total_amount = 0
        for item in items:
            description, hours = item
            total = hours * hourly_rate
            total_amount += total
            self.add_item(description, hours, hourly_rate, total)
        self.add_total(total_amount)

# Sample invoice data
client_name = "Client Name"
items = [
    ("Project Planning & Design", 8),      # Description and hours
    ("Frontend Development", 30),
    ("CMS Initial Setup", 15),
]
hourly_rate = 80  # hourly rate in dollars

# Generate PDF
pdf = PDFInvoice()
pdf.add_page()
pdf.add_title("Invoice for Professional Services")
pdf.set_font("Arial", "", 12)
pdf.cell(0, 10, f"Billed To: {client_name}", 0, 1)
pdf.cell(0, 10, f"Invoice Date: {datetime.today().strftime('%Y-%m-%d')}", 0, 1)
pdf.cell(0, 10, "Invoice Number: INV-0001", 0, 1)
pdf.ln(10)

# Table header
pdf.set_font("Arial", "B", 12)
pdf.cell(80, 10, "Description", 0, 0)
pdf.cell(30, 10, "Hours", 0, 0, "C")
pdf.cell(30, 10, "Rate", 0, 0, "C")
pdf.cell(30, 10, "Total", 0, 1, "C")
pdf.line(10, pdf.get_y(), 200, pdf.get_y())  # underline header
pdf.ln(5)

# Invoice details
pdf.add_invoice_details(items, hourly_rate)

# add date to invoice file name
date = datetime.today().strftime('%Y-%m-%d')
fileName = f"invoice-{date}.pdf"
# Save PDF
pdf.output(fileName)

print("Invoice generated successfully as " + fileName);
