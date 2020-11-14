import React from 'react';
import clsx from 'clsx';

import { MapCategories } from '../MapFeatures';

import './MapControlCategories.css';
import { t } from '../Localization';
import { useImageExtension } from '../Image';

const MapControlCategoryButton = ({ categoryKey, currentCategory, setCurrentCategory }) => {
  const category = MapCategories[categoryKey];

  const toggleOn = () => {
    // Toggle the value.
    setCurrentCategory(categoryKey);
  };

  const active = categoryKey === currentCategory;

  return (
    <div
      onClick={toggleOn}
      onKeyDown={toggleOn}
      role="button"
      aria-label={categoryKey === currentCategory ? 'Close Filter Window' : 'Open Filter Window'}
      tabIndex={0}
      className={clsx(
        'map-controls-category',
        active ? 'map-controls-category-active' : '',
        'noselect'
      )}
      style={{
        minWidth: `calc(${category?.style?.width ?? '33%'} - 8px)`,
        backgroundColor: active
          ? category?.style?.enabled?.bg
          : category?.style?.disabled?.bg ?? '#FFF',
        color: active ? category?.style?.enabled?.text : category?.style?.disabled?.text ?? '#000',
      }}
    >
      {t(category.nameKey)}
    </div>
  );
};

const MapControlCategories = ({ currentCategory, setCurrentCategory }) => {
  const ext = useImageExtension();

  return (
    <div
      className={clsx('map-controls-category-container', `map-controls-category-container-${ext}`)}
    >
      {Object.keys(MapCategories).map((key) => {
        return (
          <MapControlCategoryButton
            key={key}
            categoryKey={key}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
        );
      })}
    </div>
  );
};

export default MapControlCategories;
