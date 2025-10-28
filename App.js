import React, { useState, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';

import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      showNotification('Error fetching books', 'error');
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      await axios.post(API_URL, newBook);
      fetchBooks();
      showNotification('Book added successfully', 'success');
    } catch (error) {
      showNotification('Error adding book', 'error');
    }
  };

  const handleEditBook = async (updatedBook) => {
    try {
      await axios.put(`${API_URL}/${updatedBook._id}`, updatedBook);
      fetchBooks();
      showNotification('Book updated successfully', 'success');
    } catch (error) {
      showNotification('Error updating book', 'error');
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteBookId}`);
      fetchBooks();
      setIsDeleteModalOpen(false);
      showNotification('Book deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting book', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Book Inventory Management</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4 }}>
          <AddBookForm onSubmit={handleAddBook} />
          <BookList
            books={books}
            onEdit={(book) => {
              setSelectedBook(book);
              setIsEditModalOpen(true);
            }}
            onDelete={(id) => {
              setDeleteBookId(id);
              setIsDeleteModalOpen(true);
            }}
          />
          <EditBookModal
            book={selectedBook}
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditBook}
          />
          <DeleteConfirmationPopup
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteBook}
          />
          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification.severity}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
}

export default App;
