import moment from 'moment';

export function formatDate(date) {
	return moment(date).format("DD MMM' YY");
}

export function getTimeFromNow(date) {
	return moment(date).fromNow();
}

export function cardinalToOrdinal(number) {
	let modOf10 = number % 10,
		modOf100 = number % 100;
	if (modOf10 == 1 && modOf100 != 11) {
		return number + 'st';
	}
	if (modOf10 == 2 && modOf100 != 12) {
		return number + 'nd';
	}
	if (modOf10 == 3 && modOf100 != 13) {
		return number + 'rd';
	}
	return number + 'th';
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'INR',
});

export function getBirthYearFromAge(age) {
	return moment().subtract(age, 'years').year();
}
