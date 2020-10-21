/**
 * Data types
 * 
 * Every piece of data can be represented in different ways, 
 * i.e. a Boolean type can be appear as a Checkbox where true/false values map to Checkbox's checked/unchecked states; A Boolean can 
 * also appear as a switch with similar value -> state mapping (true -> On, false -> Off).
 * 
 * Since this multiple representation property is present in most of the supported types, and Cascara provides a flexible but slightly opinionated
 * functional design system, there's the need to define the data types and the supported representations in a clear, expressive way. 
 * 
 * An example of defining columns for a table:
 * 
 * ```js
    import dataTypes from 'dataTypes';
    
    const columns = columns: [
      {
        attribute: 'active',
        isEditable: true,
        isLabeled: false,
        label: 'Active',
        module: dataTypes.bool.asSwitch,
      },
      {
        attribute: 'eid',
        isEditable: false,
        isLabeled: false,
        label: 'ID',
        module: dataTypes.text.asText,
      },
      {
        attribute: 'email',
        isEditable: true,
        isLabeled: false,
        label: 'Email',
        module: dataTypes.text.asEmail,
      },
      ...
    ];
 * ```
 * **/
const dataTypes = {
  bool: {
    asCheckbox: 'checkbox',
    asSwitch: 'switch',
    asText: 'text',
  },
  number: {
    asEpoch: 'date',
    asNumber: 'number',
  },
  text: {
    asAvatar: 'avatar',
    asDate: 'date',
    asEmail: 'email',
    asIcon: 'icon',
    asLink: 'link',
    asRadio: 'radio',
    asSelect: 'select',
    asText: 'text',
    asTextArea: 'textarea',
  },
};

export default dataTypes;
