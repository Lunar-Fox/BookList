<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$query = $this->db->get('books');
        return $query->result();
	}

	/**
	 * Добавление книги
	 */

	public function addBook($book)
	{
		return $this->db->insert('books', $book);
	}
	
	/**
	 * Изменение информации о книге
	 */

	public function editBook($book)
	{
		$this->db->set($book);
		$this->db->where('id', $book['id']);
		return $this->db->update('books');
	}

	/**
	 * Удаление книги
	 */
	public function deleteBook($book)
	{
		$this->db->where('id', $book['id']);
		return $this->db->delete('books');
	}
	
}
