document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================
     1. ACCESSIBLE TABS COMPONENT (WAI-ARIA Pattern)
  ============================================================ */
  const tabWidget = document.querySelector('[data-nexus-tabs]');
  if (tabWidget) {
    const tabButtons = Array.from(tabWidget.querySelectorAll('[role="tab"]'));
    const tabPanels = Array.from(tabWidget.querySelectorAll('[role="tabpanel"]'));

    const switchTab = (nextTab) => {
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove('active');
        panel.setAttribute('hidden', '');
      });

      nextTab.classList.add('active');
      nextTab.setAttribute('aria-selected', 'true');
      nextTab.removeAttribute('tabindex');
      nextTab.focus();

      const controlledPanel = document.getElementById(nextTab.getAttribute('aria-controls'));
      if (controlledPanel) {
        controlledPanel.classList.add('active');
        controlledPanel.removeAttribute('hidden');
      }
    };

    tabButtons.forEach((tab, index) => {
      tab.addEventListener('click', () => switchTab(tab));

      // Arrow Key Navigation
      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabButtons.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          switchTab(tabButtons[targetIndex]);
        }
      });
    });
  }

  /* ============================================================
     2. ACCESSIBLE ACCORDION COMPONENT
  ============================================================ */
  const accordionGroup = document.querySelector('[data-nexus-accordion]');
  if (accordionGroup) {
    const items = accordionGroup.querySelectorAll('.accordion-item');

    items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const body = item.querySelector('.accordion-body');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items (single expansion mode)
        items.forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion-body').setAttribute('hidden', '');
        });

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          body.removeAttribute('hidden');
        }
      });
    });
  }

  /* ============================================================
     3. FOCUS-TRAPPED ACCESSIBLE MODAL
  ============================================================ */
  const modal = document.getElementById('nexus-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalIcon = document.getElementById('close-modal-icon');
  const closeModalCancel = document.getElementById('close-modal-cancel');
  const closeModalConfirm = document.getElementById('close-modal-confirm');
  const modalBackdrop = document.getElementById('modal-backdrop');

  let lastActiveElement = null;

  const getFocusableElements = () => {
    return Array.from(modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
  };

  const openModal = () => {
    lastActiveElement = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    const focusables = getFocusableElements();
    if (focusables.length) focusables[0].focus();

    document.addEventListener('keydown', handleModalKeydown);
  };

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeydown);

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  const handleModalKeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements();
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  openModalBtn.addEventListener('click', openModal);
  closeModalIcon.addEventListener('click', closeModal);
  closeModalCancel.addEventListener('click', closeModal);
  closeModalConfirm.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
});