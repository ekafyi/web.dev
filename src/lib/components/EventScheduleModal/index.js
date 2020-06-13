/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {BaseModalElement} from '../BaseModalElement';
import {html} from 'lit-element';
import './_styles.scss';

/**
 * @fileoverview Modal element for session information.
 */

class EventScheduleModal extends BaseModalElement {
  static get properties() {
    return {
      sessionRow: Element,
      _sessionName: String,
      _authorsPart: Element,
      _abstractPart: Element,
    };
  }

  shouldUpdate(changedProperties) {
    if (!changedProperties.has('sessionRow')) {
      return false;
    }

    this._authorsPart = null;
    this._abstractPart = null;
    this._sessionName = '';

    if (!this.sessionRow) {
      return true;
    }
    const row = this.sessionRow;

    // Extract the authors' collection and abstract.
    this._authorsPart = row.querySelector('.w-event-schedule__speaker');
    this._abstractPart = row.querySelector('.w-event-schedule__abstract');
    if (this._abstractPart) {
      this._abstractPart.removeAttribute('hidden');
    }

    // Remove the link that was used to open us.
    const link = row.querySelector('.w-event-schedule__open');
    if (link) {
      this._sessionName = link.textContent;
    }
    return true;
  }

  render() {
    return html`
      <div class="modal">
        <h2>${this._sessionName || '?'}</h2>
        ${this._authorsPart || ''}
        ${this._abstractPart || ''}
        <button
          class="w-button close gc-analytics-event"
          data-category="web.dev"
          data-label="live, close session modal"
          data-action="click"
          @click=${() => (this.open = false)}
        >
          Close
        </button>
      </main>
    `;
  }
}

customElements.define('web-event-schedule-modal', EventScheduleModal);
