from flask import Flask, render_template, request, jsonify
import random
import string

app = Flask(__name__)

def generate_password(min_length, numbers=True, special_characters=True):
    letters = string.ascii_letters
    digits = string.digits
    special = string.punctuation

    characters = letters
    if numbers:
        characters += digits
    if special_characters:
        characters += special

    pwd = ""
    meets_criteria = False
    has_number = False
    has_special = False

    while not meets_criteria or len(pwd) < min_length:
        new_char = random.choice(characters)
        pwd += new_char

        if new_char in digits:
            has_number = True
        elif new_char in special:
            has_special = True

        meets_criteria = True
        if numbers:
            meets_criteria = has_number
        if special_characters:
            meets_criteria = meets_criteria and has_special
    return pwd

@app.route("/", methods=["GET", "POST"])
def index():
    password = ""
    if request.method == "POST":
        min_length = int(request.form.get("length", 8))
        numbers = request.form.get("numbers") == "on"
        special_characters = request.form.get("special") == "on"
        password = generate_password(min_length, numbers, special_characters)
    return render_template("index.html", password=password)

if __name__ == "__main__":
    app.run(debug=True)
