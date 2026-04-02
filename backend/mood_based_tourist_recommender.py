import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load the dataset
df = pd.read_csv("tourist_places_india_moods.csv")

# Combine mood and type as features
df["Features"] = df["Associated_Moods"] + " " + df["Type"]

# Vectorize the features
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["Features"])

# Function to recommend places based on mood/type input
def recommend_places(user_input, top_n=5):
    input_vec = vectorizer.transform([user_input])
    cosine_sim = linear_kernel(input_vec, tfidf_matrix).flatten()
    top_indices = cosine_sim.argsort()[-top_n:][::-1]
    return df.iloc[top_indices][["Place", "State", "Type", "Associated_Moods", "Description"]]

# Display available moods and types
available_types = [
    "Beach", "Hill Station", "Wildlife", "Spiritual", "Adventure",
    "Island", "Mountain", "Romantic", "Historical"
]

available_moods = [
    "Relaxed", "Fun", "Peaceful", "Adventurous", "Nature-loving", "Spiritual",
    "Reflective", "Calm", "Romantic", "Thrill-seeking", "Luxurious", "Cultural",
    "Curious", "Explorative", "Historical"
]

# Example usage
if __name__ == "__main__":
    print("Available Types: " + ", ".join(available_types))
    print("Available Moods: " + ", ".join(available_moods))
    user_input = input("\nEnter your mood or preference using any of the above moods/types (e.g., Relaxed, Fun, Peaceful, Adventurous, Nature-loving, Spiritual, Reflective, Calm, Romantic, Thrill-seeking, Luxurious, Cultural, Curious, Explorative, Historical): ")
    recommendations = recommend_places(user_input) 
    print("\nTop Recommendations:\n")
    for i, row in recommendations.iterrows():
        print(f"Place: {row['Place']} ({row['State']})")
        print(f"Type: {row['Type']}")
        print(f"Moods: {row['Associated_Moods']}")
        print(f"Description: {row['Description']}\n")
