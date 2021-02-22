class Orange {
	constructor(name, taste, weight) {
		this.name = name;
		this.taste = taste;
		this.weight = weight;
	}
	showInfo() {
		return `Food: ${this.name}, ${this.taste}, ${this.weight}`;
	}
	taste() {
		alert(`Tasty and sweet ${this.name}`);
	}
}
class Tomato {
	constructor(name, taste, weight) {
		this.name = name;
		this.taste = taste;
		this.weight = weight;
	}
	showInfo() {
		return `Food: ${this.name}, ${this.taste}, ${this.weight}`;
	}
}

let orange = new Orange("Hawaiian's orange", "sweet", "100mg");
orange.showInfo(); // Food: Hawaiian's orange, sweet, 100mg
orange.taste(); // Tasty and sweet orange

let tomato = new Tomato("Tomato green cherry", "bitter", "50mg");
tomato.showInfo(); // Food: Tomato green cherry, bitter, 50mg