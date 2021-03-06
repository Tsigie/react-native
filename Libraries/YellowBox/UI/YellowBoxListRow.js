/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

const React = require('React');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const YellowBoxPressable = require('YellowBoxPressable');
const View = require('View');
const YellowBoxCategory = require('YellowBoxCategory');
const YellowBoxStyle = require('YellowBoxStyle');
const YellowBoxWarning = require('YellowBoxWarning');

import type {Category} from 'YellowBoxCategory';

type Props = $ReadOnly<{|
  category: Category,
  warnings: $ReadOnlyArray<YellowBoxWarning>,
  onPress: (category: Category) => void,
|}>;

class YellowBoxListRow extends React.Component<Props> {
  static GUTTER = StyleSheet.hairlineWidth;
  static HEIGHT = 48;

  shouldComponentUpdate(nextProps: Props): boolean {
    const prevProps = this.props;
    return (
      prevProps.category !== nextProps.category ||
      prevProps.onPress !== nextProps.onPress ||
      prevProps.warnings.length !== nextProps.warnings.length ||
      prevProps.warnings.some(
        (prevWarning, index) => prevWarning !== nextProps[index],
      )
    );
  }

  render(): React.Node {
    const {warnings} = this.props;

    return (
      <YellowBoxPressable onPress={this._handlePress} style={styles.root}>
        <View style={styles.content}>
          {warnings.length < 2 ? null : (
            <Text style={styles.metaText}>{'(' + warnings.length + ') '}</Text>
          )}
          <Text numberOfLines={2} style={styles.bodyText}>
            {YellowBoxCategory.render(
              warnings[warnings.length - 1].message,
              styles.substitutionText,
            )}
          </Text>
        </View>
      </YellowBoxPressable>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.category);
  };
}

const styles = StyleSheet.create({
  root: {
    height: YellowBoxListRow.HEIGHT,
    justifyContent: 'center',
    marginTop: YellowBoxListRow.GUTTER,
    paddingHorizontal: 12,
  },
  content: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  bodyText: {
    color: YellowBoxStyle.getTextColor(1),
    flex: 1,
    fontSize: 14,
    includeFontPadding: false,
    lineHeight: 18,
  },
  metaText: {
    color: YellowBoxStyle.getTextColor(0.5),
    fontSize: 14,
    includeFontPadding: false,
    lineHeight: 18,
  },
  substitutionText: {
    color: YellowBoxStyle.getTextColor(0.6),
  },
});

module.exports = YellowBoxListRow;
