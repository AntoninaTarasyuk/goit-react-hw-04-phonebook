import React, { Component } from "react";
import { GlobalStyles } from "./GlobalStyles";
import { nanoid } from 'nanoid';
import { ContactsForm } from 'components/ContactsForm/ContactsForm';
import { Filter } from "components/Filter/Filter";
import { ContactsList } from "components/ContactsList/ContactsList";
import { Section, Container, H1, H2, InfoMessage } from "components/App.styled";
import { BiInfoCircle } from "react-icons/bi";

export class App extends Component {
  state = {
  contacts: [],
  filter: '',
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }
  
  createContact(name, number) {
    return { name: name, number: number, id: nanoid() };
  }

  addContact = contact => {
    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  isIncludes = newName => {
    return this.state.contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newName.toLocaleLowerCase().trim()
    );
  };

  handleFormSubmit = ({ name, number }) => {
    this.isIncludes(name)
      ? alert(`${name} is already in contacts`)
      : this.addContact(this.createContact(name, number));
  };

  handleFilterChange = filterName => {
    this.setState(() => {
      return { filter: filterName };
    });
  };
  
  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <Section>
          <Container>
            <H1>Phonebook</H1>
            <ContactsForm handleFormSubmit={this.handleFormSubmit} />
          </Container>
        </Section>
        <Section>
          <Container>
            <H2>Contacts</H2>
            <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
            {contacts.length > 0
              ? <ContactsList
                  contacts={contacts}
                  filter={filter}
                  deleteContact={this.deleteContact}
                />
              : (<InfoMessage><BiInfoCircle/>There are no contacts yet</InfoMessage>)}
          </Container>  
        </Section>
        <GlobalStyles />
      </div>
    );
  };
};
