# 蓝标数据库简介
* ***blue_admin***  ：后台媒介用户表
* ***blue_admin_role*** ：媒介用户角色表
* ***blue_area*** ：城市区域表
* ***blue_bill_channel*** ：渠道商结算账单表
* ***blue_bill_channel_detail***  ：渠道商结算账单、小订单关系表
* ***blue_bill_detailed_service_provider*** ：服务商付款账单、小订单关系表
* ***blue_bill_service_provider***  ：服务商账单表
* ***blue_check_price***  ：老系统配置表，已废弃，合并到system-config表
* ***blue_compony***  ：项目主公司记录表
* ***blue_compony_department*** ：项目主公司部门记录表
* ***blue_consult_detailed*** ：咨询单所含小订单表
* ***blue_consult_order***  ：咨询单表
* ***blue_contract*** ：合同表
* ***blue_contract_detailed***  ：废弃
* ***blue_contract_orders***  ：合同、大订单关系表
* ***blue_countdown***  ：老系统配置表，已废弃，合并到system-config表
* ***blue_customer***	：项目主的客户表
* ***blue_demand_order*** ：需求单表
* ***blue_department*** ：媒介所属的部门表
* ***blue_finance_recharge*** ：老系统表，已废弃
* ***blue_industry*** ：行业表
* ***blue_media***  ：媒体号表
* ***blue_media_bind*** ：在刊媒体号的绑定关系表（老系统设计）
* ***blue_media_bind_all*** ：渠道商报价媒体号的绑定关系表
* ***blue_media_bind_all_price*** ：渠道商报价媒体号的个广告位价格表
* ***blue_media_bind_price*** ：在刊媒体号的广告位价格表
* ***blue_media_case*** ：媒体号案例表
* ***blue_media_change_record***  ：废弃
* ***blue_media_info*** ：渠道商用户信息表
* ***blue_media_info_channel*** ：废弃
* ***blue_media_info_channel_information*** ：废弃
* ***blue_media_information***  ：渠道商联系人表
* ***blue_media_info_user***  ：渠道商账号表
* ***blue_media_offer***  ：媒体号的广告位表
* ***blue_mp_fans_statistic***  ：未知表
* ***blue_notice*** ：废弃
* ***blue_open_notify***  ：废弃
* ***blue_order***  ：大订单表
* ***blue_order_detailed*** ：小订单表
* ***blue_order_setting***  ：老系统配置表，已废弃，合并到system-config表
* ***blue_permission*** ：所有权限表
* ***blue_project***  ：项目主的项目表
* ***blue_role*** ：角色表
* ***blue_role_permission***  ：角色、权限映射表
* ***blue_rule_price*** ：老系统配置表，已废弃，合并到system-config表
* ***blue_service_information***  ：服务商联系人表
* ***blue_service_provider*** ：服务商用户信息表
* ***blue_service_provider_user***  ：服务商账号表
* ***blue_short_**** 短信相关数据库。原设计很乱，现已抛弃
* ***blue_system_config***  ：系统配置表
* ***blue_user*** ：项目主表
* ***blue_user_collection***  ：项目主手收藏的媒体号表
* ***blue_user_finance*** ：废弃
* ***blue_view_func_permission*** ：视图权限、功能权限的映射表

# 系统术语：
* ***大订单（项目订单）*** ：项目主直接下单、服务商经需求单下单的订单。

* ***小订单（账号订单）*** ：大订单所含的，以具体媒体号广告位为单位的订单。
* ***需求单*** ：项目主间接下单给目标服务商的订单。

# 金额术语：
* ***订单金额*** ：下单时，所有广告位的 ***售价*** 之和  + 订单 ***服务费*** + 订单 ***税费***
* ***成交金额*** ：项目订单完成时，成功执行部分的 ***订单金额***
* ***售价（刊例价）*** ：广告位的平台售价
* ***市场价*** ：广告位的市面价格
* ***执行价*** ：平台执行广告主订单应收取的价格，= ***售价*** +- ***变价***
* ***变价*** ：广告主经服务商下单时，服务商对订单金额的变化价格
* ***结算价*** ：广告位被卖出后，平台应支付渠道商的价格， = ***报价*** +- ***变价***
* ***实际结算价*** ：平台实际支付给渠道商的费用
* ***报价*** ：渠道商广告位跟平台收取的价格

# 代码规范
* ***mapper.xml命名*** ：跟表名一致
* ***应用层类名规范*** ： 系统根据N个不同领域，如大订单(order)域，分为N组服务类。一组服务类 `*QueryService`用作查询服务(R)；一组服务类`*CommandService`用作CUD操作。
* ***应用层之下的领域层规范*** ： 在服务层方法内，调用领域方法。这层领域方法大体有两种规范，一种是完全按照
  > DDD（领域驱动设计）

  设计的，类名如`*Repository`主要用于跟数据层交互；类名如`*Factory`主要用于对领域实体的创建、修改等操作。另外一种，领域类名如`*DomainService`，此类方法内对应用层提供了诸多接口，用于完成相应的操作。

# 特殊事务
* ***定时器*** ： 系统拥有一个定时器类，`ScheduledTask`用于定时生成服务商、渠道商的月、周结算账单以及小订单投放时间过期校验等操作
* ***环境配置*** : 系统采用环境变量自动检测机制，动态加载不同环境的配置文件(`*.properties`)。环境变量通过不同状态的`profiles`来激活。现有`product`、`dev`、`test`三种环境。环境变量设置方法，通过在tomcat容器的`/bin`目录下，创建`setenv.sh`文件，通过`JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=product"`语句来指定。
* ***目录讲解*** : `com.hd`目录为老系统代码，现已不加载，只是留待确定逻辑用。现在也可以删除。`com.tarsocial`为现有系统的代码目录，通常情况下，一次请求先后经历的目录为:
  - `com.tarsocial.web`
  - `com.tarsocial.application`
  - `com.tarsocial.domain`
  - `com.tarsocial.infrastructure`
