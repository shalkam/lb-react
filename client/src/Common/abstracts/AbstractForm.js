import {RestForm, AppEvents} from 'react-at-rest';
import shortid from 'shortid';

export default class AbstractForm extends RestForm {
  parseErrors(body) {
    return {
      errorMessage: body.error.name,
      errors: body.error.details.messages
    };
  }

  saveModel(validate = true) {
    if (this.state.busy) return this.state.busy;

    const model = this.getUpdatedModel();

    // validate the model
    if (validate) {
      const errors = this.validateModel(model)
      if (errors) return errors;
    }
    let deferred;
    // a model with an id exists already, so we issue a patch
    if (model.id) {
      // ignore empty updates
      if (Object.keys(this.state.patch).length === 0) {
        this.props.onSuccess()
        return null;
      }
      deferred = this.props.store.updateResource(model.id, model, this.props.options)
      // otherwise create a new resource
    } else {
      model.id = shortid.generate();
      deferred = this.props.store.createResource(model, {
        parentResourceId: this.props.parentResourceId,
        parentResourcesKey: this.props.parentResourcesKey,
        query: this.props.options && this.props.options.query ? this.props.options.query : null
      });
    }
    // set busy state
    this.setState({ busy: false });

    return deferred
      .then((data) => {
        this.setState({ busy: false });
        AppEvents.trigger('form.error', {});
        this.props.onSuccess(data);
      })
      .catch(this.handleErrors)
  }
}
