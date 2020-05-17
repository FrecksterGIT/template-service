import {FeatureServiceBinding} from '@feature-hub/core';
import {Callback, FeatureServiceImplementation, Registry} from '@das-buro-am-draht/feature-hub-tools';

import {TemplateServiceOptions} from '../feature-service';

export interface ServicePayload {
  noEmptyInterfaces?: boolean;
}

export interface TemplateServiceV1 {
  registerCallback: (callback: Callback<ServicePayload>) => void;
  unregisterCallback: () => void;
  update: Callback<ServicePayload>;
}

export const TemplateServiceV1Implementation: FeatureServiceImplementation<TemplateServiceV1, TemplateServiceOptions> = () => {
  const registry = Registry<ServicePayload>();

  return {
    create: (consumerId: string): FeatureServiceBinding<TemplateServiceV1> => {
      const subscription = registry.subscribe(consumerId);

      return {
        featureService: {
          registerCallback: subscription.register,
          unregisterCallback: subscription.unregister,
          update: registry.update,
        },
        unbind: subscription.unregister,
      };
    },
  };
};
