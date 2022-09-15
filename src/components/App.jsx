import { useState } from "react";
import { useLocalStorage } from "Hooks/UseLocalStorage";
import { ContactsForm } from "components/ContactsForm/ContactsForm";
import { Filter } from "components/Filter/Filter";
import { ContactsList } from "components/ContactsList/ContactsList";
import { Section, Container, H1, H2, InfoMessage } from "components/App.styled";
import { nanoid } from "nanoid";
import { BiInfoCircle } from "react-icons/bi";
import { GlobalStyles } from "./GlobalStyles";

export function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const createContact = (name, number) => {
    return { name: name, number: number, id: nanoid() };
  };

  const addContact = contact => {
    setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const isIncludes = newName => {
    return contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newName.toLocaleLowerCase().trim()
    )
  };

  const handleFormSubmit = ({ name, number }) => {
    isIncludes(name)
      ? alert(`${name} is already in contacts`)
      : addContact(createContact(name, number));
  };

  const handleFilterChange = filterName => {
    setFilter(filterName);
  };

  return (
    <>
      <Section>
        <Container>
          <H1>Phonebook</H1>
          <ContactsForm handleFormSubmit={handleFormSubmit} />
        </Container>
      </Section>
      <Section>
        <Container>
          <H2>Contacts</H2>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          {contacts.length > 0
            ? <ContactsList
                contacts={contacts}
                filter={filter}
                deleteContact={deleteContact}
              />
            : (<InfoMessage><BiInfoCircle/>There are no contacts yet</InfoMessage>)}
        </Container>  
      </Section>
      <GlobalStyles />
    </>
  );
};