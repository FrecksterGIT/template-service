import {FeatureServiceBinder, SharedFeatureService} from '@feature-hub/core';
import {
  defineFeatureService,
  FeatureServiceDefinition,
  FeatureServiceInterface,
} from '@das-buro-am-draht/feature-hub-tools';

import {TemplateServiceV1, TemplateServiceV1Implementation} from './v1/template-service-v1';

interface Service extends SharedFeatureService {
  readonly '1.0.0': FeatureServiceBinder<FeatureServiceInterface<TemplateServiceV1>>;
}

interface TemplateServiceOptions {
  template: boolean;
}

const definition: FeatureServiceDefinition<TemplateServiceV1, TemplateServiceOptions> = {
  id: 'template-service',
  versions: {
    '1.0.0': TemplateServiceV1Implementation,
  },
  defaultOptions: {
    template: true,
  },
};

const defineTemplateFeatureService = defineFeatureService<TemplateServiceV1, Service, TemplateServiceOptions>(definition);

export {defineTemplateFeatureService, TemplateServiceV1, TemplateServiceOptions};
