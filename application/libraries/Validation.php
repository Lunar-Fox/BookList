<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Validation
 * Контроллер для валидации данных
 */

class Validation {

    public function validateData($input)
    {
        $bookData['id'] = filter_var($input['id'], FILTER_VALIDATE_INT);
        $bookData['book_name'] = filter_var($input['book_name'], FILTER_VALIDATE_REGEXP, ['options' => ["regexp" => '/[а-яА-Яa-zA-Z\s.?!-]/'] ]);
        $bookData['author_name'] = filter_var($input['author_name'], FILTER_VALIDATE_REGEXP, ['options' => ["regexp" => '/^[а-яА-Яa-zA-Z\s.-]/'] ]);
        $bookData['book_year'] = filter_var($input['book_year'], FILTER_VALIDATE_REGEXP, ['options' => ["regexp" => '/^[12][0-9]{3}$/'] ]);
        return $bookData;
    }
}
