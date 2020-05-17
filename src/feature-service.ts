import {FeatureServiceBinder, SharedFeatureService} from '@feature-hub/core';
import {
  defineFeatureService,
  FeatureServiceDefinition,
  FeatureServiceInterface,
} from '@freckstergit/feature-service-definition';
import {TemplateServiceV1, TemplateServiceV1Implementation} from './v1/template-service-v1';

type ServiceVersions = TemplateServiceV1; // V1 | V2 ...

interface Options {
  noEmptyInterfaces?: boolean;
}

interface Service extends SharedFeatureService {
  readonly '1.0.0': FeatureServiceBinder<FeatureServiceInterface<TemplateServiceV1>>;
}

type Definition = FeatureServiceDefinition<ServiceVersions, Options>;

const definition: Definition = {
  id: 'test',
  versions: {
    '1.0.0': TemplateServiceV1Implementation,
  },
  defaultOptions: {},
  dependencies: {},
  optionalDependencies: {},
};

const defineTemplateFeatureService = defineFeatureService<ServiceVersions, Service, Options>(definition);

export {defineTemplateFeatureService, TemplateServiceV1, Options};
