<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */

class Book extends CI_Controller {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

	/**
	 * Добавление книги
	 */

	public function addBook()
	{
		$this->load->model('Book_model');
		$bookData = $this->input->post();
		$result = $this->Book_model->addBook($bookData);
		echo json_encode($result);
	}

	/**
	 * Изменение информации о книге
	 */

	public function editBook()
	{
		$this->load->model('Book_model');

		$bookData = json_decode(trim(stripslashes(file_get_contents('php://input'))), TRUE);
		$validate = new Validation();
		$validatedData = $validate->validateData($bookData);

		if(!$validatedData['id'] || !$validatedData['book_name'] || !$validatedData['author_name'] || !$validatedData['book_year']) {
			echo false;
		} else {
			$result = $this->Book_model->editBook($validatedData);
			echo json_encode($result);
		}
	}

	/**
	 * Удаление книги
	 */
	public function deleteBook()
	{
		$this->load->model('Book_model');
		$bookId = json_decode(trim(stripslashes(file_get_contents('php://input'))), TRUE);
		$result = $this->Book_model->deleteBook($bookId);
		echo json_encode($result);
	}

	/**
	 * Экспорт в XML
	 */
	public function exportBooks()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		header("Content-Type: text/xml; charset=utf-8");
		$xml = '<?xml version="1.0" encoding="UTF-8"?><books>';
		foreach($bookList as $book) {
			$id = $book->id;
			$name = $book->book_name;
			$author = $book->author_name;
			$xml .= '<book>'.
					'<id>' . $id . '</id>' .
					'<name>' . $name . '</name>' . 
					'<author>' . $author . '</author>' .
				'</book>';
		}
		$xml .= '</books>';
		echo $xml;
	}
}
