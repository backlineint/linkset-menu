import type { MenuElementInterface } from './menu-element';
import type { MenuLink } from './menu-element';
import type { NormalizedLinksetInterface, LinksetInterface } from 'linkset';
import { Linkset } from 'linkset/dist/core/linkset';
import { buildTree, MenuElement } from './menu-element';

export interface MenuInterface extends LinksetInterface {
  readonly id: string;
  readonly tree: MenuElementInterface[];
}

export type NormalizedMenuInterface = NormalizedLinksetInterface;

export class Menu extends Linkset implements MenuInterface {
  readonly id: string;
  readonly tree: MenuElement[];
  constructor(machineName: string, linkset: LinksetInterface) {
    super(linkset.elements);
    this.id = machineName;
    this.tree = buildTree([...(this.elements as Array<MenuLink>)]);
  }
  /**
   * {@inheritDoc LinksetInterface.linksTo}
   */
  linksTo(relationType: string): Menu {
    return new Menu(this.id, super.linksTo(relationType));
  }
  /**
   * {@inheritDoc LinksetInterface.linksFrom}
   */
  linksFrom(anchor: string): Menu {
    return new Menu(this.id, super.linksTo(anchor));
  }
  /**
   * {@inheritdoc LinksetInterface.linksWithAttribute}
   */
  linksWithAttribute(name: string): Menu {
    return new Menu(this.id, super.linksWithAttribute(name));
  }
  /**
   * {@inheritdoc LinksetInterface.linksWithAttributeValue}
   */
  linksWithAttributeValue(name: string, value: string | { value: string, language?: string }): Menu {
    return new Menu(this.id, super.linksWithAttributeValue(name, value));
  }
}

