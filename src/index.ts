import type { LinkInterface } from 'linkset';
import type { MenuElementInterface } from './core/menu-element';
import type { MenuInterface, NormalizedMenuInterface } from './core/menu';
import { Menu } from './core/menu';
import { denormalize as denormalizeLinkset } from 'linkset';

/**
 * Denormalizes a set of links into an instance of a Menu.
 * {@inheritDoc Menu.from}
 * {@see {@link NormalizedMenuInterface}}
 */
function denormalize(normalized: NormalizedMenuInterface, menuID?: string): Menu | Menu[] {
  const linkset = denormalizeLinkset(normalized);
  const machineNames: string[] = [];
  if (!menuID) {
    linkset.linksWithAttribute('drupal-menu-machine-name').elements.forEach((link: LinkInterface) => {
      if (!machineNames.includes(link.attributes["drupal-menu-machine-name"][0])) {
        machineNames.push(link.attributes["drupal-menu-machine-name"][0]);
      }
    });
  } else {
    machineNames.push(menuID);
  }
  const menus = machineNames.map((machineName ) => {
    return new Menu(machineName, linkset.linksWithAttributeValue('drupal-menu-machine-name', machineName));
  });
  return menuID ? menus.shift() : menus;
}

/**
 * Parses Drupal menu JSON into a Menu instance.
 * {@see {@link denormalize}}
 */
function parse(json: string, menuID?: string): Menu | Menu[] {
  return denormalize(JSON.parse(json), menuID);
}

export {
  parse,
  denormalize,
}

export type {
  MenuInterface,
  MenuElementInterface,
  NormalizedMenuInterface,
};
