import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css"


const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('Contacts');
    if (savedContacts !== null) {
       return JSON.parse(savedContacts)
  }
  return initialContacts;
}

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeNameFilter = newFilterName => {
    setFilter(newFilterName);
  }

  const addContact = newContact => {
    const isContactExist = contacts.filter(contact => contact.name === newContact.name).length !== 0;
    if (isContactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, newContact])
  }

  const handleDelete = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))  
  }

  const visibleContactItems = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div className={css.phonebook}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2 className={css.secondTitle}>Contacts</h2>
      <Filter nameFilter={filter} onChange={changeNameFilter} />
      <ContactsList contacts={visibleContactItems} onDelete={handleDelete} />
    </div>
  );
} 