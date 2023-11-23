import React from 'react';

import { Checkbox, HelpText } from '@digdir/design-system-react';
import cn from 'classnames';

import { ConditionalWrapper } from 'src/components/ConditionalWrapper';
import { DeleteWarningPopover } from 'src/components/molecules/DeleteWarningPopover';
import { useAlertOnChange } from 'src/hooks/useAlertOnChange';
import { useLanguage } from 'src/hooks/useLanguage';
import classes from 'src/layout/Checkboxes/CheckboxesContainerComponent.module.css';
import { getPlainTextFromNode } from 'src/utils/stringHelper';
import type { IOption } from 'src/layout/common.generated';

interface IWrappedCheckboxProps {
  id: string;
  option: IOption;
  hideLabel?: boolean;
  alertOnChange?: boolean;
  selected: string[];
  value: string;
  setValue: (value: string) => void;
}

export function WrappedCheckbox({
  id,
  option,
  hideLabel,
  alertOnChange,
  selected,
  value,
  setValue,
}: IWrappedCheckboxProps) {
  const { lang, langAsString } = useLanguage();

  const handleCheckboxStateChange = (isChecked: boolean) => {
    const checkedItems = isChecked ? [...selected, option.value] : selected.filter((item) => item !== option.value);
    const checkedItemsString = checkedItems.join(',');
    checkedItemsString !== value && setValue(checkedItems.join(','));
  };

  const { alertOpen, setAlertOpen, handleChange, confirmChange, cancelChange } = useAlertOnChange(
    Boolean(alertOnChange),
    handleCheckboxStateChange,
    // Only alert when unchecking
    (isChecked) => isChecked === false,
  );

  return (
    <ConditionalWrapper
      key={option.value}
      condition={Boolean(alertOnChange)}
      wrapper={(children) => (
        <DeleteWarningPopover
          deleteButtonText={langAsString('form_filler.alert_confirm')}
          messageText={langAsString('form_filler.checkbox_alert')}
          onCancelClick={cancelChange}
          onPopoverDeleteClick={confirmChange}
          open={alertOpen}
          setOpen={setAlertOpen}
        >
          {children}
        </DeleteWarningPopover>
      )}
    >
      <Checkbox
        id={`${id}-${option.label.replace(/\s/g, '-')}`}
        name={option.value}
        description={lang(option.description)}
        value={option.value}
        checked={selected.includes(option.value)}
        size='small'
        onChange={(e) => handleChange(e.target.checked)}
      >
        {
          <span className={cn({ 'sr-only': hideLabel }, classes.checkboxLabelContainer)}>
            {langAsString(option.label)}
            {option.helpText && (
              <HelpText title={getPlainTextFromNode(option.helpText)}>{lang(option.helpText)}</HelpText>
            )}
          </span>
        }
      </Checkbox>
    </ConditionalWrapper>
  );
}