/**
 * Espressive CRUD Table
 *
 * The features tested in this suite are the following:
 *
 * Basic table
 * Trigger Bar
 * Selectable
 * Editable
 * expandable
 * deletable
 * triggers
 *
 * Some of these features interact with each other, so the proper
 * test has been added as well.
 */
describe('CRUD Table', () => {
  /**
   * In this section we test the structure of the table
   * with no features other than a basic table. */
  describe('basic table', () => {
    test('it renders basic table structure', () => {
      /**
       * validate the existence of the following structure
       *
       * - table
       *   - header
       *   - body
       *     - rows
       *   - footer
       */
      expect(true).toBeFalsy();
    });
  });

  /**
   * In this section we test the trigger bar
   * integrated with the table. */
  describe('trigger bar', () => {
    test('it renders the Trigger Bar', () => {
      /**
       * validate the existence of the following structure
       *
       * - table
       *   - header
       *   - bulk trigger bar
       *   - body
       *     - rows
       *     - single trigger bar
       *   - footer
       */
      expect(true).toBeFalsy();
    });
  });

  /**
   * Selection feature
   *
   * This section tests the markup that enables the selection feature,
   * as well as the internal logic */
  describe('selectable', () => {
    test('it renders bulk selection toggle in header', () => {
      /**
       * validate the existence of the following structure
       *
       * - table
       *   - header
       *     - bulk selection toggle
       *     - the rest of the columns
       */
      expect(true).toBeFalsy();
    });

    test('it renders single selection toggle for each record', () => {
      /**
       * validate the existence of the following structure
       *
       * - table
       *   - header
       *   - body
       *     - rows
       *       - single selection toggle
       */
      expect(true).toBeFalsy();
    });

    test('it allows bulk selection', () => {
      /**
       * validate that multiple records can be selected
       */
      expect(true).toBeFalsy();
    });

    test('bulk selection toggle works', () => {
      /**
       * 1. select some
       * 2. deselect some
       * 3. select all
       * 4. deselect all
       */
      expect(true).toBeFalsy();
    });

    test('trigger bar and selection work together', () => {
      /**
       *
       * no selection + default triggers
       * 1. verify that default triggers are displayed
       *
       * selection + bulk triggers
       * 1. select some/all
       * 2. verify that bulk triggers are displayed
       */
      expect(true).toBeFalsy();
    });

    test('event triggers work ', () => {
      /**
       *
       * no selection + default triggers
       * 1. verify that no triggers are displayed
       *
       * selection + bulk triggers
       * 1. select some/all
       * 2. verify that bulk triggers are displayed
       */
      expect(true).toBeFalsy();
    });
  });

  /**
   * Edit feature
   *
   * This section tests the markup that enables the create feature,
   * as well as the internal logic.
   *
   * The tests are carried out in single and bulk scenarios. */
  describe('editable', () => {
    test('single edit mode works', () => {
      /**
       * 1. enable edit mode via single edit button
       * 2. verify the UI enters edition mode
       * 3. edit some fields and save
       * 4. verify the UI exits edition mode
       * 5. verify the update is reflected in the record
       * 6. optionally, verify the onUpdate event has been raised
       */
      expect(true).toBeFalsy();
    });

    test('single edit mode can be canceled', () => {
      /**
       * 1. enable edit mode via single edit button
       * 2. verify the UI enters edition mode
       * 3. edit some fields and cancel
       * 4. verify the UI exits edition mode
       * 5. verify the update is NOT reflected in the record
       */
      expect(true).toBeFalsy();
    });

    test('bulk edit mode works', () => {
      /**
       * 1. select some records
       * 2. enable edit mode via bulk edit button
       * 3. verify the UI enters edition mode
       * 4. edit some fields in all records and save
       * 5. verify the UI exits edition mode
       * 6. verify the update is reflected in the records
       * 7. optionally, verify the onUpdate event has been raised
       */
      expect(true).toBeFalsy();
    });

    test('bulk edit mode can be canceled', () => {
      /**
       * 1. select some records
       * 2. enable edit mode via bulk edit button
       * 3. verify the UI enters edition mode
       * 4. edit some fields in all records and cancel
       * 5. verify the UI exits edition mode
       * 6. verify the update is NOT reflected in the records
       */
      expect(true).toBeFalsy();
    });
  });

  /**
   * Create feature
   *
   * This section tests the markup that enables the create feature,
   * as well as the internal logic. */
  describe('expandable', () => {
    test('it renders NEW button in bulk trigger bar', () => {
      /**
       * verify the markup includes the new button when
       * expandable prop is passed.
       */
      expect(true).toBeFalsy();
    });

    test('adding a record works', () => {
      /**
       * 1. click New in the bulk trigger bar
       * 2. verify that the UI enters create mode
       * 3. fill-up the row
       * 4. click Save in the single trigger bar
       * 5. optionally, verify that the onCreate event is raised
       * 6. verify that the UI exited create mode
       */
      expect(true).toBeFalsy();
    });

    test('adding a record can be canceled', () => {
      /**
       * 1. click New in the bulk trigger bar
       * 2. verify that the UI enters create mode
       * 3. fill-up the row
       * 4. click Cancel in the single trigger bar
       * 5. verify that the UI exited create mode
       */
      expect(true).toBeFalsy();
    });
  });

  /**
   * Delete feature
   *
   * This section tests the markup that enables the delete feature,
   * as well as the internal logic.
   *
   * The tests are carried out in single and bulk scenarios. */
  describe('deletable', () => {
    test('it renders DELETE button in bulk trigger bar', () => {
      /**
       * verify the markup includes the delete button when
       * expandable prop is passed and there is a selection
       */
      expect(true).toBeFalsy();
    });

    test('deleting a single record works', () => {
      /**
       * 1. click Delete in the single trigger bar
       * 5. optionally, verify that the onDelete event is raised
       */
      expect(true).toBeFalsy();
    });

    test('deleting multiple records works', () => {
      /**
       * 1. select some records
       * 2. click Delete in the bulk trigger bar
       * 5. optionally, verify that the onDelete event is raised
       */
      expect(true).toBeFalsy();
    });
  });

  describe('triggers', () => {
    test('single triggers', () => {
      /**
       * - verify the markup includes the trigger button
       * - verify that the onTrigger event is raised correctly
       */
      expect(true).toBeFalsy();
    });

    test('bulk triggers', () => {
      /**
       * - verify the markup includes the bulk trigger button
       * - verify that the onTrigger event is raised correctly
       */
      expect(true).toBeFalsy();
    });
  });
});
