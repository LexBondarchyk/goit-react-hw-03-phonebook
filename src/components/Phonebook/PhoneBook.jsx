import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import styles from './phoneBook.module.scss';

const CONTACTS ='contacts';

export class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(CONTACTS);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      Notiflix.Notify.failure(`${name} is olready in contacts`);
      return;
    }

    this.setState(prevState => {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  isDublicate(name) {
    const normalizedName = name.toLocaleLowerCase();
    const { contacts } = this.state;

    const result = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContscts = contacts.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(normalizedFilter);
    });

    return filteredContscts;
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contsct => contsct.id !== id);
      return { contacts: newContacts };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { filter } = this.state;
    const { removeContact, handleFilter, addContact } = this;
    const contactsFilter = this.getFilteredContacts();
    const isContactsFilter = Boolean(contactsFilter.length);

    return (
      <section className={styles.sectionBook}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={styles.titleContacts}>Contacts</h2>
        <Filter handleFilter={handleFilter} filter={filter} />
        {isContactsFilter && (
          <ContactList
            contacts={contactsFilter}
            remuveContact={removeContact}
          />
        )}
        {!isContactsFilter && <p>There is no contacts.</p>}
      </section>
    );
  }
}

export default PhoneBook;
