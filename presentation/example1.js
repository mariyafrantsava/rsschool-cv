class Food {
	constructor(name, taste, weight) {
		this.name = name;
		this.taste = taste;
		this.weight = weight;
	}
	showInfo() {
		return `Food: ${this.name}, ${this.taste}, ${this.weight}`;
	}
}

class Orange extends Food {
	taste() {
		alert(`Tasty and sweet ${this.name}`);
	}
}

let orange = new Orange("Hawaiian's orange", "sweet", "100mg");
orange.showInfo(); // Food: Hawaiian's orange, sweet, 100mg
orange.taste(); // Tasty and sweet orange

let tomato = new Food("Tomato green cherry", "bitter", "50mg");
tomato.showInfo(); // Food: Tomato green cherry, bitter, 50mg


let animal = {
	color: "brown",
	kindPet: "cocker-spaniel",

	set fullKindPet(value) {
		[this.color, this.kindPet] = value.split(" ");
	},

	get fullKindPet() {
		return `${this.color} ${this.kindPet}`;
	}
};

let dog = {
	__proto__: animal,
	isAdmin: true
};

alert(dog.fullKindPet); // brown cocker-spaniel

// run set
dog.fullKindPet = "black&white dalmatian";
alert(dog.color); // black&white
alert(dog.kindPet); // dalmatian