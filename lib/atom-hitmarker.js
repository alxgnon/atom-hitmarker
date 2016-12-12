'use babel';

import AtomHitmarkerView from './atom-hitmarker-view';
import { CompositeDisposable } from 'atom';

export default {

  atomHitmarkerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomHitmarkerView = new AtomHitmarkerView(state.atomHitmarkerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomHitmarkerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-hitmarker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomHitmarkerView.destroy();
  },

  serialize() {
    return {
      atomHitmarkerViewState: this.atomHitmarkerView.serialize()
    };
  },

  toggle() {
    console.log('AtomHitmarker was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
