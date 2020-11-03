import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from 'mirador/dist/es/src/state/actions';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import translations from '../translations';

/** */
class MiradorAnnotation extends Component {
  /** */
  constructor(props) {
    super(props);
    this.openCreateAnnotationCompanionWindow = this.openCreateAnnotationCompanionWindow.bind(this);
  }

  /** */
  openCreateAnnotationCompanionWindow(e) {
    const {
      addCompanionWindow,
    } = this.props;

    addCompanionWindow('annotationCreation', { position: 'right' });
  }

  /** */
  render() {
    const { TargetComponent, targetProps, t } = this.props;
    return (
      <div>
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <MiradorMenuButton
          aria-label={t('createNewAnnotation')}
          onClick={this.openCreateAnnotationCompanionWindow}
          size="small"
        >
          <AddBoxIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

MiradorAnnotation.propTypes = {
  addCompanionWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  TargetComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

MiradorAnnotation.defaultProps = {
  t: (key) => key,
};

/** */
const mapDispatchToProps = (dispatch, props) => ({
  addCompanionWindow: (content, additionalProps) => dispatch(
    actions.addCompanionWindow(props.targetProps.windowId, { content, ...additionalProps }),
  ),
});

export default {
  component: MiradorAnnotation,
  config: {
    translations,
  },
  mapDispatchToProps,
  mode: 'wrap',
  target: 'AnnotationSettings',
};
