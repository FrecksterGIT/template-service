import {FeatureServiceBinding} from '@feature-hub/core';
import {FeatureServiceInterface} from '@freckstergit/feature-service-definition';

import {TemplateServiceV1, TemplateServiceV1Implementation} from './template-service-v1';

let implementation: FeatureServiceInterface<TemplateServiceV1>;
let instance: FeatureServiceBinding<TemplateServiceV1>;
let featureService: TemplateServiceV1;

beforeEach(() => {
  implementation = TemplateServiceV1Implementation({}, {featureServices: {}});
  instance = implementation.create('test');
  featureService = instance.featureService;
});

test('Implementation should have a create method', () => {
  expect(typeof implementation.create).toBe('function');
});

test('instance should provide an unbind method', () => {
  expect(typeof instance.unbind).toBe('function');
});

test('the created instance', () => {
  expect(typeof featureService.registerCallback).toBe('function')
  expect(typeof featureService.unregisterCallback).toBe('function')
  expect(typeof featureService.update).toBe('function');
});

test('registering should call the callback', () => {
  const callback = jest.fn();
  featureService.registerCallback(callback);
  expect(callback).toHaveBeenCalledTimes(1);
});

test('registering and updating should call the callback', () => {
  const callback = jest.fn();
  const payload = {noEmptyInterfaces: false};
  featureService.registerCallback(callback);
  expect(callback).toHaveBeenCalled();
  featureService.update(payload);
  expect(callback).toHaveBeenCalledWith(payload);
  expect(callback).toBeCalledTimes(2);
});

test('should not call callback after unregister', () => {
  const callback = jest.fn();
  const payload = {noEmptyInterfaces: false};
  featureService.registerCallback(callback);
  featureService.unregisterCallback();
  featureService.update(payload);
  expect(callback).toBeCalledTimes(1);
});
