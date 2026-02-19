// week3.js - Dynamically load book details into the content frame

document.addEventListener('DOMContentLoaded', function () {
	// This script runs inside the navigation frame (navigation.html)
	var navLinks = document.querySelectorAll('a[data-book-id]');
	if (!navLinks.length) {
		return;
	}

	var bookData = {
		'clean-code': {
			title: 'Clean Code',
			author: 'Robert C. Martin',
			category: 'Technology / Programming',
			price: '$20',
			isbn: '978-0132350884',
			availability: 'In Stock',
			description: 'A handbook of agile software craftsmanship focusing on writing clean, maintainable code.'
		},
		'alchemist': {
			title: 'The Alchemist',
			author: 'Paulo Coelho',
			category: 'Fiction',
			price: '$12',
			isbn: '978-0061122415',
			availability: 'In Stock',
			description: 'A novel about a shepherd boy on a journey to realize his personal legend.'
		},
		'atomic-habits': {
			title: 'Atomic Habits',
			author: 'James Clear',
			category: 'Self Help',
			price: '$15',
			isbn: '978-0735211292',
			availability: 'Limited Stock',
			description: 'Practical strategies for building good habits and breaking bad ones.'
		},
		'ds-algo': {
			title: 'Data Structures and Algorithms',
			author: 'Narasimha Karumanchi',
			category: 'Computer Science',
			price: '$25',
			isbn: '978-8193245279',
			availability: 'Out of Stock',
			description: 'Detailed explanations of core data structures and algorithms with interview focus.'
		}
	};

	function loadBookIntoContentFrame(bookId) {
		var info = bookData[bookId];
		if (!info) {
			return;
		}

		var contentFrame = parent.frames['contentFrame'];
		if (!contentFrame || !contentFrame.document) {
			return;
		}

		var doc = contentFrame.document;
		var container = doc.getElementById('bookDetails');
		if (!container) {
			return;
		}

		container.innerHTML =
			'<h3>' + info.title + '</h3>' +
			'<p><strong>Author:</strong> ' + info.author + '</p>' +
			'<p><strong>Category:</strong> ' + info.category + '</p>' +
			'<p><strong>ISBN:</strong> ' + info.isbn + '</p>' +
			'<p><strong>Price:</strong> ' + info.price + '</p>' +
			'<p><strong>Availability:</strong> ' + info.availability + '</p>' +
			'<p><strong>Description:</strong> ' + info.description + '</p>';
	}

	navLinks.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			var bookId = this.getAttribute('data-book-id');
			loadBookIntoContentFrame(bookId);
		});
	});
});
