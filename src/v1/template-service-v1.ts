import {FeatureServiceBinding} from '@feature-hub/core';
import {FeatureServiceImplementation} from '@freckstergit/feature-service-definition';
import {Options} from '../feature-service';

export type Callback<TPayload> = (payload: TPayload) => void;

export interface TemplateServicePayload {
  noEmptyInterfaces?: boolean;
}

export interface TemplateServiceV1 {
  registerCallback: (callback: Callback<TemplateServicePayload>) => void;
  unregisterCallback: () => void;
  update: Callback<TemplateServicePayload>;
}

export const TemplateServiceV1Implementation: FeatureServiceImplementation<TemplateServiceV1, Options> = () => {
  const callbacks = new Map<string, Callback<TemplateServicePayload>>();
  let payload: TemplateServicePayload = {};

  const create = (consumerId: string): FeatureServiceBinding<TemplateServiceV1> => {

    const registerCallback = (callback: Callback<TemplateServicePayload>): void => {
      if (typeof callback !== 'function') {
        throw new Error(`Bad parameter 'callback': Expect function but got ${typeof callback}.`);
      }

      if (typeof callbacks.get(consumerId) === 'function') {
        throw new Error(`A callback is already defined for consumer: ${consumerId}.`);
      }

      callbacks.set(consumerId, callback);
      callback(payload);
    };

    const unregisterCallback = (): void => {
      callbacks.delete(consumerId);
    };

    const update = (data: TemplateServicePayload): void => {
      payload = data;

      callbacks.forEach((callback) => {
        callback(payload);
      });
    };

    return {
      featureService: {
        registerCallback,
        unregisterCallback,
        update,
      },
      unbind: unregisterCallback,
    };
  };

  return {
    create,
  };
};
