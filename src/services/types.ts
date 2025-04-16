//type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface Iingredient {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
}

export interface IburgerElement {
	//extends Nullable<Iingredient> {
	guid?: string;
	tp?: 'bottom' | 'top' | undefined;
	_id?: string;
	name?: string;
	type?: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price?: number;
	image?: string;
	image_mobile?: string;
	image_large?: string;
}

export interface IBurgerArr {
	bun: IburgerElement | null;
	ingredients: IburgerElement[];
}

export interface IFeedOrder {
	_id: string;
	ingredients: string[];
	name: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	number: string;
}

export interface IFeedData {
	success: boolean;
	orders: Array<IFeedOrder>;
	total: number;
	totalToday: number;
}
