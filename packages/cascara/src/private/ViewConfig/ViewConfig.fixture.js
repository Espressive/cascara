import React from 'react';
import JsonPlaceholder from '../../scaffolding/JsonPlaceholder';
import ViewConfig, { useViewConfigState } from '.';

const optionList = [
  'aaron_ramsey',
  'alex_song',
  'alexandre_lacazette',
  'ben_white',
  'bernd_leno',
  'beth_mead',
  'bukayo_saka',
  'carlos_vela',
  'cesc_fabregas',
  'dennis_bergkamp',
  'gabriel_martinelli',
  'granit_xhaka',
  'jack_wilshere',
  'jordan_nobbs',
  'katie_mccabe',
  'kieran_tierney',
  'kim_little',
  'laurent_koscielny',
  'leah_williamson',
  'mana_iwabuchi',
  'martin_odegaard',
  'nicolas_pepe',
  'nikita_paris',
  'nuno_tavares',
  'patrick_viera',
  'rob_holding',
  'santi_cazorla',
  'takehiro_tomiyasu',
  'theo_walcott',
  'thiery_henry',
  'thomas_partey',
  'thomas_rosicky',
  'tobin_heath',
  'vivianne_miedema',
];

const OPTIONS = optionList.map((opt) => ({
  label: opt
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' '),
  parameter: opt,
  team: 'Arsenal',
  team_number: 320,
  an_object: {
    cool: 'okay',
    bool: true,
  },
}));

const All = (fixtureProps) => {
  const viewConfigState = useViewConfigState();

  return (
    <main className='ui container'>
      <h2>All</h2>
      <p>
        A ViewConfig component accepts an array of objects as options. It
        manages a selection of those objects as state and exposes those selected
        objects in a state hook. This component is agnostic about the shape of
        the objects being passed to it and should always return the whole
        original object in the selection. Only <code>label</code> is used in the
        menu display of the component.
      </p>
      <ViewConfig state={viewConfigState} {...fixtureProps} />
      <JsonPlaceholder
        data={viewConfigState?.currentSelection || {}}
        isInitialOpen
        style={{ float: 'right' }}
        title='currentSelection'
      />
    </main>
  );
};

const InitialValue = (fixtureProps) => {
  const viewConfigState = useViewConfigState({
    initialSelection: [OPTIONS[3], OPTIONS[1]],
  });

  return (
    <main className='ui container'>
      <h2>Initial Value</h2>
      <p>
        It should be possible to initialize the viewConfig with an initial value
        selection.
      </p>
      <ViewConfig state={viewConfigState} {...fixtureProps} />
      <JsonPlaceholder
        data={viewConfigState?.currentSelection || {}}
        isInitialOpen
        style={{ float: 'right' }}
        title='currentSelection'
      />
    </main>
  );
};

const WithStateAndOptions = (fixtureProps) => {
  const viewConfigState = useViewConfigState();

  return (
    <div style={{ textAlign: 'center' }}>
      <ViewConfig options={OPTIONS} state={viewConfigState} {...fixtureProps} />
    </div>
  );
};

const NoState = () => (
  <>
    <h2>No State</h2>
    <p>Throw and catch an error if no state hook is defined.</p>
    <ViewConfig options={[]} />
  </>
);

const NoOptions = () => {
  const viewConfigState = useViewConfigState();
  return (
    <>
      <h2>No Options/Loading</h2>
      <p>
        Has state but no options are defined. This would essentially be a
        loading state.
      </p>
      <ViewConfig state={viewConfigState} />
    </>
  );
};

export default {
  all: <All options={OPTIONS} placement='bottom-start' title='Columns' />,
  initialValue: <InitialValue options={OPTIONS} />,
  isInitialOpen: <WithStateAndOptions isInitialOpen />,
  title: <WithStateAndOptions title='Title Prop Here' />,
  placement: <WithStateAndOptions placement='bottom-start' />,
  trigger: (
    <WithStateAndOptions
      trigger={<button type='button'>Custom trigger</button>}
    />
  ),
  noState: <NoState />,
  noOptions: <NoOptions />,
};
