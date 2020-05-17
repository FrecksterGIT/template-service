import {defineTemplateFeatureService} from './feature-service';

test('Feature Service Definition should id and create method', () => {
  const featureService = defineTemplateFeatureService();

  expect(featureService.id).toBeDefined();
  expect(typeof featureService.create).toEqual('function');
});
