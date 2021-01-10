import json
import random

streaming_services = [0, 1, 6, 231, 337]
country_codes = ["CA", "US", "UK"]
users = []

with open("./seeds/users.json", "w") as fp:
	for i in range(1, 51):
		user = {
			"name": f"User {i}",
			"email": f"user{i}@email.com",
			"password": "password",
			"countryCode": random.choice(country_codes),
			"subscribedTo": random.sample(set(streaming_services), random.randint(1, 3))
		}
		users.append(user)
	json.dump(users, fp, indent=4)
